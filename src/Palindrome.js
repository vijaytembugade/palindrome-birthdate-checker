import React, { useState } from "react";
import "./App.css";

const Palindrome = () => {
  const [date, setDate] = useState();
  const [outPut, setOutput] = useState("");

  function handleClick() {
    setOutput(<img alt="loading" src="https://thumbs.gfycat.com/EnchantingInbornDogwoodtwigborer.webp"/>)
    if (date) {
      let [yyyy, mm, dd] = date.split("-");
      setTimeout(() => {
        setOutput(checkPalindrome(yyyy, mm, dd));
      }, 2000);
    } else {
      setOutput(<h2>Invalid date format</h2>);
    }
  }

  function checkPalindrome(yyyy, mm, dd) {
    let dateType1 = yyyy + mm + dd;
    let dateType2 = dd + mm + yyyy;
    let dateType3 = mm + dd + yyyy.slice(-2);
    let dateType4 = null;
    if (parseInt(mm) < 10) {
      dateType4 = dd + mm.slice(-1) + yyyy;
    } else {
      dateType4 = dd + mm + yyyy;
    }

    if (dateType1 === makeReverse(dateType1)) {
      return <h2>Your birthdate is palindrome.</h2>;
    } else if (dateType2 === makeReverse(dateType2)) {
      return <h2>Your birthdate is palindrome.</h2>;
    } else if (dateType3 === makeReverse(dateType3)) {
      return <h2>Your birthdate is palindrome.</h2>;
    } else if (dateType4) {
      if (dateType4 === makeReverse(dateType4)) {
        return <h2>Your birthdate is palindrome. </h2>;
      }
    }

    let nearestDate = nearestPalindrome(yyyy, mm, dd);

    return (
      <h2>
        Your birthdate is not palindrome. Your Nearest Palindrome date is{" "}
        {GetFormattedDate(nearestDate[1])}, you missed it by {nearestDate[0]}{" "}
        days.
      </h2>
    );
  }

  function nearestPalindrome(yyyy, mm, dd) {
    // var mydate = new Date(yyyy , dd, Number(mm)-1)
    let mydate = new Date(yyyy, Number(mm) - 1, dd);
    // console.log(mydate)
    let nextPalindrome;
    let previousPalindrome;

    for (let i = 1; i > 0; i++) {
      let ddString = mydate.getDate();
      let mmString = mydate.getMonth();
      let yyyyString = mydate.getFullYear().toString();

      if (ddString < 10) {
        ddString = "0" + ddString.toString();
      }
      if (mmString < 10) {
        mmString = "0" + mmString.toString();
      }

      let newDate = ddString + mmString + yyyyString;

      if (newDate === makeReverse(newDate)) {
        previousPalindrome = newDate;
        // console.log(previousPalindrome)
        break;
      }
      mydate.setDate(mydate.getDate() - 1);
    }

    let myPrevdate = new Date(yyyy, Number(mm) - 1, dd);
    for (let i = 1; i > 0; i++) {
      let ddString = myPrevdate.getDate();
      let mmString = myPrevdate.getMonth();
      let yyyyString = myPrevdate.getFullYear().toString();

      if (ddString < 10) {
        ddString = "0" + ddString.toString();
      }
      if (mmString < 10) {
        mmString = "0" + mmString.toString();
      }

      let newDate = ddString + mmString + yyyyString;

      if (newDate === makeReverse(newDate)) {
        nextPalindrome = newDate;
        // console.log(nextPalindrome)
        break;
      }
      myPrevdate.setDate(myPrevdate.getDate() + 1);
    }

    const myInputdate = new Date(yyyy, Number(mm) - 1, dd);

    const datePrev = new Date(
      previousPalindrome.slice(-4),
      previousPalindrome.slice(2, 4) - 1,
      previousPalindrome.slice(0, 2)
    );
    // console.log(datePrev)

    const dateNext = new Date(
      nextPalindrome.slice(-4),
      nextPalindrome.slice(2, 4) - 1,
      nextPalindrome.slice(0, 2)
    );
    // console.log(dateNext)

    const diffDays1 = Math.abs(dateDiffInDays(datePrev, myInputdate));
    console.log(diffDays1);
    const diffDays2 = Math.abs(dateDiffInDays(dateNext, myInputdate));
    console.log(diffDays2);

    if (diffDays1 < diffDays2) {
      return [diffDays1, datePrev];
    } else {
      return [diffDays2, dateNext];
    }
  }

  function dateDiffInDays(a, b) {
    const oneDay = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / oneDay);
  }

  function makeReverse(dateString) {
    return dateString.split("").reverse().join("");
  }

  function GetFormattedDate(nearestDate) {
    var todayTime = nearestDate;
    var month = todayTime.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var day = todayTime.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var year = todayTime.getFullYear();
    return day + "-" + month + "-" + year;
  }

  return (
    <div className="container">
      <h2>Palindrome Birthdate checker</h2>
      <h4>
        Enter your birthdate and we will tell you if your birthdate is a
        palindrome or not.
      </h4>
      <div className="description">
        <p>
          This app checks your birthdate in 4 formats yyyy-mm-dd, dd-mm-yyyy,
          mm-dd-yy, m-dd-yyyy 
          </p>
          <p>e.g. if your birthdate is 01 Aug 1995, then app
          will check for 19950801, 01081995, 080195, 1081995
        </p>
      </div>
      <input onChange={(e) => setDate(e.target.value)} type="date"></input><br/>
      <button onClick={handleClick}>Check</button>
      
      
      
      <div class="output">
      

      {outPut}
      </div>

    </div>
  );
};

export default Palindrome;
