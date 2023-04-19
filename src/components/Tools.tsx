import React, { useEffect, useRef, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { TbKeyOff, TbKey } from "react-icons/tb";
const Tools = (props: any) => {
  //we store the theme in localStorage to preserve the state on next visit with an initial theme of dark.
  const [theme, setTheme] = useState("");
  const [apiKey, setApiKey] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // load key from localStroage
    if (localStorage.getItem("apikey")) {
      setApiKey(localStorage.getItem("apikey") || '');
    }

    // load theme
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme") || '');
    }
  }, []);

  //toggles the theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "cupcake" : "dark");
  };

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  }

  // modify data-theme attribute on document.body when theme changes
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setKey = () => {
    inputRef.current?.classList.remove("input-error");
    if(apiKey == ""){
      inputRef.current?.classList.add("input-error");
    }
    else {
      if (checkboxRef.current) {
        props.onVarFromChild(apiKey);
        localStorage.setItem("apikey", apiKey);
        checkboxRef.current.checked = false;
      }
    }
  };

  return (
    <div>
      <div className="btn btn-circle fixed left-4 top-4" onClick={toggleTheme}>
        {theme === "dark" ? (
          <FiSun className="w-5 h-5" />
        ) : (
          <FiMoon className="w-5 h-5" />
        )}
      </div>
      <label htmlFor="my-modal">
        {apiKey ? (
          <div className="btn btn-circle fixed left-20 top-4">
            <TbKey className="w-5 h-5" />
          </div>
        ) : (
          <div className="btn btn-circle fixed left-20 top-4">
            <TbKeyOff className="w-5 h-5" />
          </div>
        )}
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" ref={checkboxRef} />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-lg">Use your own openAI API KEY</h3>
          <p className="py-4">Key will store in your browser's local storage</p>
          <input ref={inputRef} type="text" placeholder="openAI api key" className="input input-bordered w-full max-w-xs" value={apiKey} onChange={handleChange} />
          <div className="modal-action">
            <label className="btn" onClick={setKey}>Set!</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;

