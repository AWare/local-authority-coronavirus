import './style';
import { urls } from './councils';

import Autocomplete from 'accessible-autocomplete/preact'
import authorities from 'ms-uk-local-authorities'
import { useState } from 'preact/hooks';

const authorityArray = authorities.map(_=>_.label)

const suggest = (query, populateResults) => {
  const filteredResults = authorityArray.filter(result => result.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  populateResults(filteredResults)
}

 
export const App = () => {
	const [currentAuthority,setCurrentAuthority] = useState("")
const websites = urls[currentAuthority]
	return (
    <div id="app">
      <h2>Find your Local Authority/Council's Coronavirus Information Page</h2>
      <p>Search for your local council below, if you don't know who your local council is, it's probably written on the bins. Otherwise, <a href="https://www.gov.uk/find-local-council"> please use this tool to find out</a>.</p>
			<Autocomplete id='autocomplete' source={suggest} onConfirm={(_) => {
				if(_)	setCurrentAuthority(_)
			}} confirmOnBlur={true} />
	
      {currentAuthority && <>
        <p>For {currentAuthority} we found:</p>
        <ul>
          {websites.map(url => <li><a href={url}>{url}</a></li>)}
        </ul>
      </>}

      <p>This website is open source, and lives in this <a href="https://github.com/AWare/local-authority-coronavirus">github repository</a>.
        If you notice any issues, please contact me there. </p>
            
		</div>
	)
}

export default App
 
