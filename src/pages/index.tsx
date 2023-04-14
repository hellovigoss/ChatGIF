import React from "react"
import { useEffect } from 'react'
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import GithubConor from "../components/githubConor";
import GithubIco from "../components/githubIco";
import SwitchTheme from "../components/SwitchTheme";

import mdStyles from '../components/Markdown.module.css';


export default function Home() {
  const [keyword, setKeyWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [md, setMd] = useState("");
  const [welcome, setWelcome] = useState(true);
  const [error, setErr] = useState(false);
  const search = async (event: React.KeyboardEvent) => {
    let ele = event.target as HTMLInputElement;
    if(ele.value.length == 0) {
      return;
    }
    if (event.key == 'Enter') {
      ele.setAttribute("readonly", "readonly");
      ele.setAttribute("disabled", "disabled")
      setErr(false);
      setMd("");
      setWelcome(false);
      setLoading(true);
      const data = {
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": `hey ChatGPT. hope you're having a great day.
        From now on you will respond to anything I say with the perfect gif response.
        Once you know what gif you want to use, compile the most accurate and perfect search phrase that will result in the specific gif you want to send.
         
        respond with markdown:
        "
        Sure, I'm happy to help you!\n

        ![result](http://scythe-spot-carpenter.glitch.me/search?search_term=<SEARCH+PHRASE>.gif)
        "
        `
          },
          {"role": "assistant", "content": "Sure thing! I'll do my best to respond with the perfect gif for anything you say. Just let me know what you need!"},
          {
            "role": "user",
            "content": ele.value
          }
        ]
      }
      const response = await fetch('/api/gif', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if(response.status == 200) {
        const resJson = await response.json();
        setMd(resJson.choices[0].message.content);
      }
      else {
        setErr(true);
      }
      setLoading(false);
    }
  }
  return (
    <main className="flex flex-col justify-between items-center h-screen w-screen">
      {error &&
      <div className="alert alert-error shadow-lg md:w-2/3 w-full fixed">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Ops~ Something went wrong, please try again later!</span>
        </div>
      </div>
      }
      <GithubConor></GithubConor>
      <div className="hero h-screen md:w-2/3 w-full bg-base-300">
        <div className="hero-content text-center w-full flex flex-col content-center">
          <SwitchTheme></SwitchTheme>
          {welcome &&
          <div>
          <h1 className="text-5xl font-bold mb-3"><span className="text-red-400">ChatGIF</span> with AI</h1>
          <h3 className="text-3xl font-bold mb-8">Powered by ChatGPT</h3>
          </div>
          }
          <div className="w-3/4">
            {loading &&
              <progress className="progress w-1/2"></progress>
            }

            {md &&
              <ReactMarkdown className={`bg-base-200 m-5 px-3 py-10 rounded-lg text-center flex flex-col justify-center ${mdStyles.markdown}`}>{md}</ReactMarkdown>
            }
            {!loading &&
              <input onKeyDown={search} type="text" placeholder="input anything, press ENTER to search" className="input input-bordered w-full max-w-md" />
            }
          </div>
        </div>
      </div>
      <footer className="footer md:w-2/3 w-full h-auto p-8 bg-neutral text-neutral-content">
        <div className=" w-full">
          <p className="text-right w-full">
            Made by vgs.dy on <a href="https://github.com/hellovigoss" target="_blank">GitHub&nbsp;&nbsp;
            <GithubIco></GithubIco>
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
