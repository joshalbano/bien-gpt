import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Typewriter from "typewriter-effect";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result1, setResult1] = useState("....");
  const [result2, setResult2] = useState();
  const [result3, setResult3] = useState();
  const [loading, setLoading] = useState(false);
  const [parseresult, setResult] = useState();

  async function onSubmit(event) {
    setLoading(true)
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data.result1)
      //console.log(data.result2)
      //console.log(data.result3)
      //setResult1(data.result1)
      const y = data.result1
      const x = JSON.stringify(data.result1);
      let x1 = y.replace(/\n/g, `
      `);
      setResult(x1)
      setResult2(data.result2);
      setResult3(data.result3);
      console.log(typeof x);
      setAnimalInput("");
      setLoading(false)
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Bien Guiao</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        {loading === true ? 
   <div className={styles.loading}><img className={styles.loading} src="/yes.gif"/></div> : 
    <>
    <div className={styles.result}>
    <Typewriter className={styles.result}
     onInit={(typewriter)=> {
     typewriter
     .changeDelay(10)
     .typeString(parseresult)
     .pauseFor(1000)
     .start();
     }}
     />
  </div></>

  }
        
      </main>
    </div>
  );
}
