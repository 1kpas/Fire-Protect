import { json } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useSubmit
} from "@remix-run/react";

import { useEffect, useState } from "react";
import { apiShopify, authenticate } from "../shopify.server";

const scriptList = [
  "https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-F12.js",
  "https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Devtools.js",
  "https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Soucer.js",
  "https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Copy.js",
  "https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Content.js"
]

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const apiScriptTag = await apiShopify.rest.ScriptTag.all({
    session
  })
  
  return json({ 
    shop: session.shop.replace(".myshopify.com", ""),
    activeScripts: apiScriptTag.data
   });
};

/**
 * 
 * @param {{ request: Request }} param0 
 * @returns 
 */
export async function action({ request }) {
  const { session } = await authenticate.admin(request);

  /**
   * @type {{src: string, method: "ADD" | "REMOVE" | "ADD_ALL" | "REMOVE_ALL"}}
   */
  const data = JSON.parse(await request.text())

  const apiScriptTag = new apiShopify.rest.ScriptTag({
    session
  })
  
  if (data.method === "ADD") {
    apiScriptTag.src = data.src
    apiScriptTag.event = "onload"
    await apiScriptTag.save()
  } else if (data.method === "REMOVE") {
    const scripts = await apiShopify.rest.ScriptTag.all({
      session
    })
      
    for (const script of scripts.data) {
      if (script.src === data.src) {
        apiScriptTag.id = script.id
        await apiScriptTag.delete()
      }
    }
  } else if (data.method === "ADD_ALL") {
    for (const script of scriptList) {
      apiScriptTag.src = script
      apiScriptTag.event = "onload"
      await apiScriptTag.save()
    }
  } else {
    const scripts = await apiShopify.rest.ScriptTag.all({
      session
    })
      
    for (const script of scripts.data) {
      apiScriptTag.id = script.id
      await apiScriptTag.delete()
    }
  }

 return {
  finished: true
 }
}

export default function Index() {
  const { activeScripts } = useLoaderData()
  const submit = useSubmit();
  const l = useActionData()
  const [isInReq, setIsInReq] = useState(false)
  const [scriptsStatus, setScriptsStatus] = useState({})  

  useEffect(() => {
    let data = {}

    for (const x of activeScripts) {
      if(data[x] == null) {
        data = {
          ...data,
          [x.src]: true
        }
      }
    }

    setScriptsStatus(data)
  }, [activeScripts])

  useEffect(() => {
    if (l?.finished) {
      setTimeout(() => {
        setIsInReq(false)
      }, 200)
    }
  }, [l])

  const addScript = (src) => {
    submit(JSON.stringify({
      src,
      method: "ADD"
    }), {
      method: "POST",
      encType: "application/json"
    })
  }

  const addAllScript = () => {
    setIsInReq(true)
    submit(JSON.stringify({
      method: "ADD_ALL"
    }), {
      method: "POST",
      encType: "application/json"
    })
  };


  const removeScript = (src) => {
    submit(JSON.stringify({
      src,
      method: "REMOVE"
    }), {
      method: "POST",
      encType: "application/json"
    })
  }

  const removeAllScript = () => {
   setIsInReq(true)
   submit(JSON.stringify({
      method: "REMOVE_ALL"
    }), {
      method: "POST",
      encType: "application/json"
    })
  console.log("FInished")
}

  const handleAct = (src, status) => {
    setIsInReq(true)
    status ? removeScript(src) : addScript(src)
  }
  

  return (
    <div className="container">
      <h1>Configurações do Bloqueador</h1>
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: "40px",
          fontFamily: "sans-serif"
        }}>
          <div>
              <button disabled={isInReq} onClick={() => { addAllScript() }} style={{
                border: "none",
                padding: "10px 10px",
                background: "green",
                color: "white",
                borderRadius: "10px",
                fontSize: "0.9rem"
              }}>Ativar todos scripts</button>
          </div>
          <div>
              <button disabled={isInReq} onClick={() => { removeAllScript() }} style={{
                border: "none",
                padding: "10px 10px",
                background: "orange",
                color: "white",
                borderRadius: "10px",
                fontSize: "0.9rem",
              }}>Desativar todos scripts</button>
          </div>
      </div>
      <div className="option">
          <label>Bloquear F12:</label>
          <label className="switch">
              <input type="checkbox" disabled={isInReq} checked={scriptsStatus["https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-F12.js"]} id="blockF12" onChange={() => { handleAct("https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-F12.js", scriptsStatus["https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-F12.js"]) }}></input>
              <span className="slider"></span>
          </label>
      </div>
      <div className="option">
          <label>Bloquear Conteúdo:</label>
          <label className="switch">
              <input type="checkbox" id="blockContent" disabled={isInReq} checked={scriptsStatus["https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Content.js"]} onChange={() => { handleAct("https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Content.js", scriptsStatus["https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Content.js"]) }}></input>
              <span className="slider"></span>
          </label>
      </div>
      <div className="option">
          <label>Bloquear Ctrl+C (Copiar):</label>
          <label className="switch">
              <input type="checkbox" id="blockCopy" disabled={isInReq} checked={scriptsStatus["https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Copy.js"]} onChange={() => { handleAct("https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Copy.js", scriptsStatus["https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Copy.js"])}}></input>
              <span className="slider"></span>
          </label>
      </div>
      <div className="option">
          <label>Bloquear Ctrl+U (Ver código fonte):</label>
          <label className="switch">
              <input type="checkbox" id="blockSource" disabled={isInReq} checked={scriptsStatus["https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Soucer.js"]} onChange={() => { handleAct("https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Soucer.js", scriptsStatus["https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Soucer.js"]) }}></input>
              <span className="slider"></span>
          </label>
      </div>
      <div className="option">
          <label>Bloquear Ctrl+Shift+I (Ferramentas do desenvolvedor):</label>
          <label className="switch">
              <input type="checkbox" id="blockDevTools" disabled={isInReq} checked={scriptsStatus["https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Devtools.js"]} onChange={() => { handleAct("https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Devtools.js", scriptsStatus["https://cdn.jsdelivr.net/gh/1kpas/viperscripts@main/Block-Devtools.js"]) }}></input>
              <span className="slider"></span>
          </label>
      </div>
      <div className="option">
          <label>Bloquear Links Externos (Ant-Dmca):</label>
          <label className="switch">
              <input type="checkbox" disabled={isInReq} /* checked={coloque o estado aqui, por exemplo: scriptsStatus["https://link-do-seu-script.js"]}*/ onChange={() => { /* Sua função de handle aqui */ }}></input>
              <span className="slider"></span>
          </label>
      </div>

      {isInReq && (
        <div className="overlay">
          <div className="popup">
            <span role="img" aria-label="Injeção">💉</span>
            Injetando script...
          </div>
        </div>
      )}
      <style jsx>{`
        .container {
          font-family: sans-serif;
          background-color: #f7f7f7;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        button {
          transition: transform 0.1s, box-shadow 0.2s;
          margin: 10px;
        }
        button:active {
          transform: scale(0.95);
        }
        button:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .switch input:checked + .slider {
          background-color: #4CAF50;
        }
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }
        .switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup {
          padding: 20px 40px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          gap: 15px;
        }
      `}</style>
    </div>
  );
}