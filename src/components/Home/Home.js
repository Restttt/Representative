import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import swal from 'sweetalert';


import './NewHome.scss';



const option1 = [
  { value: 'representative', label: 'Representative' },
  { value: 'senator', label: 'Senator' }
]

const option2 = [
  { value: "AL", label: 'Alabama' },
  { value: "AK", label: 'Alaska' },
  { value: "AZ", label: 'Arizona' },
  { value: "AR", label: 'Arkansas' },
  { value: "CA", label: 'California' },
  { value: "CO", label: 'Colorado' },
  { value: "CT", label: 'Connecticut' },
  { value: "DE", label: 'Delaware' },
  { value: "DC", label: 'District Of Columbia' },
  { value: "FL", label: 'Florida' },
  { value: "GA", label: 'Georgia' },
  { value: "HI", label: 'Hawaii' },
  { value: "ID", label: 'Idaho' },
  { value: "IL", label: 'Illinois' },
  { value: "IN", label: 'Indiana' },
  { value: "IA", label: 'Iowa' },
  { value: "KS", label: 'Kansas' },
  { value: "KY", label: 'Kentucky' },
  { value: "LA", label: 'Louisiana' },
  { value: "ME", label: 'Maine' },
  { value: "MD", label: 'Maryland' },
  { value: "MA", label: 'Massachusetts' },
  { value: "MI", label: 'Michigan' },
  { value: "MN", label: 'Minnesota' },
  { value: "MS", label: 'Mississippi' },
  { value: "MO", label: 'Missouri' },
  { value: "MT", label: 'Montana' },
  { value: "NE", label: 'Nebraska' },
  { value: "NV", label: 'Nevada' },
  { value: "NH", label: 'New Hampshire' },
  { value: "NJ", label: 'New Jersey' },
  { value: "NM", label: 'New Mexico' },
  { value: "NY", label: 'New York' },
  { value: "NC", label: 'North Carolina' },
  { value: "ND", label: 'North Dakota' },
  { value: "OH", label: 'Ohio' },
  { value: "OK", label: 'Oklahoma' },
  { value: "OR", label: 'Oregon' },
  { value: "PA", label: 'Pennsylvania' },
  { value: "RI", label: 'Rhode Island' },
  { value: "SC", label: 'South Carolina' },
  { value: "SD", label: 'South Dakota' },
  { value: "TN", label: 'Tennessee' },
  { value: "TX", label: 'Texas' },
  { value: "UT", label: 'Utah' },
  { value: "VT", label: 'Vermont' },
  { value: "VA", label: 'Virginia' },
  { value: "WA", label: 'Washington' },
  { value: "WV", label: 'West Virginia' },
  { value: "WI", label: 'Wisconsin' },
  { value: "WY", label: 'Wyoming' }
]





const Home = () => {

  const [firstName, changeFirst] = useState('First Name');
  const [lastName, changeLast] = useState('Last Name');
  const [district, changeDistrict] = useState('District');
  const [phone, changePhone] = useState('Phone');
  const [office, changeOffice] = useState('Office');
  const [link, changeLink] = useState('Link');
  const [officeType, changeType] = useState(null);
  const [usState, changeUsState] = useState(null);
  const [people, setPeople] = useState([]);
  const personData = useRef("data")

  useEffect(() => {
    return () => {
      return (firstName, lastName, district, phone, office, usState, officeType, people, link);
    };
  }, [firstName, lastName, district, phone, office, officeType, usState, people, link]);


  function scrollToData() {
    const height = personData.current.offsetTop - 300;
    window.scrollTo(0, height);
  };

  function search() {
    if (officeType === null || usState === null) {
      return swal("Oops!", "Select an office and state!", "error");
    }

    if (officeType.value === 'senator') {
      Axios.get(`/senators/${usState.value}`).then(res => {
        return setPeople(res.data.results);
      }).catch(err => console.log(err));
    } else if (officeType.value === 'representative') {
      Axios.get(`/representatives/${usState.value}`).then(res => {
        return setPeople(res.data.results);
      }).catch(err => console.log(err));
    } else {
      return swal("Oops!", "Select an office and state!", "error");
    }

    changeType(null);
    changeUsState(null);
    changeFirst('First Name');
    changeLast('Last Name');
    changeDistrict('Disctrict');
    changePhone('Phone');
    changeOffice('Office');
    changeLink('Link');
  }

  function displayInfo(person) {

    let firstName = person.name.split(' ').slice(0, -1).join(' ');
    let lastName = person.name.split(' ').slice(-1).join(' ');

    
    changeFirst(firstName);
    changeLast(lastName);
    changeDistrict(person.district);
    changePhone(person.phone);
    changeOffice(person.office);
    changeLink(person.link);

    scrollToData();
  }

  
  function displayParty() {
    return people.map(person => {
      if (person.party === "Democrat") {
        return (
          <li key={person.name} onClick={() => displayInfo(person)}>D</li>
        )
      } else if (person.party === "Republican") {
        return (
          <li key={person.name} onClick={() => displayInfo(person)}>R</li>
        )
      } else if (person.party === "Independent") {
        return (
          <li key={person.name} onClick={() => displayInfo(person)}>I</li>
        )
      } else {
        return (
          <li key={person.name} onClick={() => displayInfo(person)}>{person.party}</li>
        )
      }
    })
  }

  function displayName() {
    return people.map(person => {
      return (
        <li key={person.name} onClick={() => displayInfo(person)}>{person.name}</li>
      )
    })
  }



  return (
    <div className="home">

      <header>
        <h1 className="title blue">Who's My Representative?</h1>
      </header>


      <div className="page-info">

        <div className="selection-container">
          <Select
            value={officeType}
            onChange={changeType}
            options={option1} x
            className="select"
          />
          <Select
            value={usState}
            onChange={changeUsState}
            options={option2}
            className="select"
          />
          <button onClick={search}>Search</button>
        </div>

        <div className="result-container">

          <div className="list-container">

            <div className="list">
              <h2 className="title">List  /  <span className="blue">Represenatitives</span></h2>
              <div className="data">
                <div>
                  <h3>Name</h3>
                  <ul>
                    {displayName()}
                  </ul>
                </div>
                <div>
                  <h3>Party</h3>
                  <ul>
                    {displayParty()}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="info-container" ref={personData}>
            <h2 className="title">Info</h2>
            <input value={firstName} readOnly="readOnly" />
            <input value={lastName} readOnly="readOnly" />
            <input value={district} readOnly="readOnly" />
            <input value={phone} readOnly="readOnly" />
            <input value={office} readOnly="readOnly" />
            <a href={link} target="_blank" rel="noopener noreferrer"><input value={link} readOnly="readOnly" /></a>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Home;