const https = require('https')
const { readFile, writeFile } = require('fs').promises
const path = require('path')

const sourceUrl = 'https://raw.githubusercontent.com/chromium/chromium/main/chrome/common/chrome_switches.cc'

const readmePath = path.resolve(__dirname, '../README.md')

function getBlankBlock () {
  return {
    comment: [],
    note: [],
    flag: []
  }
}

async function getSourceContent (url = sourceUrl) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const { statusCode, statusMessage } = response
      if (statusCode === 200) {
        response.setEncoding('utf8')
        let responseContent = ''
        response.on('data', (data) => {
          responseContent += data
        })
        response.on('end', () => {
          resolve(responseContent)
        })
      } else {
        reject(`FAIL: Request returned status ${statusCode} with message "${statusMessage}".`)
      }
    }).on('error', (error) => {
      reject(`FAIL: Request failed with message "${error.message}".`)
    })

  })
}

const conditionStartRe = /^\#if\s+/

function isConditionStartLine (content) {
  return content.match(conditionStartRe)
}

const conditionEndRe = /^\#endif/

function isConditionEndLine (content) {
  return content.match(conditionEndRe)
}

function parseConditionStart (content) {
  return content.replace(conditionStartRe, '')
}

const flagLineRe = /^const char \w+\[\]\s+=/

function isFlagLine (content) {
  return content.match(flagLineRe)
}

function parseFlagName (content) {
  const matches = /"(.+)"/.exec(content)
  return matches ? matches[1] : ''
}

const commentLineRe = /^\/\/\s+/

function isCommentLine (content) {
  return content.match(commentLineRe)
}

function parseCommentLine (content) {
  return content.replace(commentLineRe, '')
}

function parseSource (content = '') {
  const flags = []

  let block = getBlankBlock()
  let parseAsFlagLine = false
  let currentCondition = ''

  function evaluateBlock () {
    const flagName = parseFlagName(block.flag.join(''))
    if (flagName !== '') {
      flags.push({
        flag: flagName,
        comment: block.comment.join(' '),
        note: block.note.join(' '),
        condition: currentCondition
      })
    }
  }

  const lines = content.split('\n')
  lines.forEach((line) => {
    // TODO multi line condition parsing
    if (line === '') {
      evaluateBlock()
      parseAsFlagLine = false
      block = getBlankBlock()
    } else if (isConditionStartLine(line)) {
      currentCondition = parseConditionStart(line)
    } else if (isConditionEndLine(line)) {
      evaluateBlock()
      parseAsFlagLine = false
      block = getBlankBlock()
      currentCondition = ''
    } else if (isCommentLine(line)) {
      parseAsFlagLine = false
      if (block.flag.length === 0) {
        // comments before flag definition
        block.comment.push(parseCommentLine(line))
      } else {
        // comments after flag definition
        block.note.push(parseCommentLine(line))
      }
    } else if (isFlagLine(line)) {
      if (parseAsFlagLine) {
        evaluateBlock()
        parseAsFlagLine = false
        block = getBlankBlock()
      }
      parseAsFlagLine = true
      block.flag.push(line)
    } else if (parseAsFlagLine) {
      block.flag.push(line)
    }
  })
  evaluateBlock()

  return flags
}

function flagsToMarkdown (flags = []) {
  const result = []

  flags.forEach(flag => {
    result.push(`### ${flag.flag}`)

    if (flag.condition) {
      result.push(`CONDITION: \`${flag.condition}\``)
    }
    if (flag.comment) {
      result.push(flag.comment)
    }

    if (flag.note) {
      result.push(`NOTE: ${flag.note}`)
    }

  })

  return result.join('\n\n')
}

const flagsSectionTitle = '## Flags';

(async () => {
  try {
    const flags = parseSource(await getSourceContent())
    const readmeContent = await readFile(readmePath, 'utf8')
    const originalContent = readmeContent.split(flagsSectionTitle)[0]
    const newContent = [
      originalContent,
      flagsSectionTitle,
      '\n\n',
      `Last updated: ${new Date(Date.now()).toLocaleString('en')}`,
      '\n\n',
      flagsToMarkdown(flags),
      '\n'
    ].join('')

    await writeFile(readmePath, newContent, 'utf8')

  } catch (error) {
    console.error(error)
  }
})()
