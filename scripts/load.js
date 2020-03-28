const lines = require('lines-async-iterator');
const fs = require('fs');
const authorities = require('ms-uk-local-authorities');
const { execSync } = require('child_process');
(async () => {
  const re = /(.*) (http.*)/
  let urls = {}
  for await (const line of lines("urls")) {
    try {
      const match = re.exec(line)
      const council = match[1]
      const url = match[2]
      urls[council] = [url, ...urls[council] || []]
    } catch (e) {
      console.error(e)
      console.error(line)
      console.error(re.exec(line))
    }
  }
  fs.writeFileSync("../councils.js", `
  export const urls = ${JSON.stringify(urls, undefined, 2)}
  `);
  const missing = authorities.map(_ => _.label).filter(authority => !urls[authority])
  console.log(missing.length)
  missing.slice(0, 50).forEach(authority => {
    console.log(authority, urls[authority])
    
  execSync(`open "https://google.com/search?q=${authority.replace(/ /g,'+')}"`)
})
  
  

})()