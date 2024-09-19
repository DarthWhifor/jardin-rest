import React, { useRef, useState } from "react";
import './../App.css';


const Home = () => {
    const baseURL = "https://api.restful-api.dev";
  
    const get_id = useRef(null);
    const get_title = useRef(null);
  
    const post_title = useRef(null);
    const data = [];
    const post_year = useRef(null);
    const update_year = useRef(null);
    const x_access = "oklmasbswfuwfnernj657230rplih876gx6383hjfn48gf";
  
    const put_id = useRef(null);
    const put_title = useRef(null);
    const put_description = useRef(null);
    const put_published = useRef(null);
  
    const delete_id = useRef(null);
  
    const [getResult, setGetResult] = useState(null);
    const [postResult, setPostResult] = useState(null);
    const [putResult, setPutResult] = useState(null);
    const [deleteResult, setDeleteResult] = useState(null);
  
    const fortmatResponse = (res) => {
      return JSON.stringify(res, null, 2);
    }
  
    async function getAllData() {
      try {
        const res = await fetch(`${baseURL}/objects`);
  
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
  
        const data = await res.json();
  
        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
            "Access-Control-Allow-Origin":"*",
          },
          length: res.headers.get("Content-Length"),
          data: data,
        };
  
        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(err.message);
      }
    }
  
    async function getDataById() {
      const id = get_id.current.value;
  
      if (id) {
        try {
          const res = await fetch(`${baseURL}/objects/${id}`);
  
          if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
          }
  
          const data = await res.json();
  
          const result = {
            data: data,
            status: res.status,
            statusText: res.statusText,
            headers: {
              "Content-Type": res.headers.get("Content-Type"),
              "Content-Length": res.headers.get("Content-Length"),
            },
          };
  
          setGetResult(fortmatResponse(result));
        } catch (err) {
          setGetResult(err.message);
        }
      }
    }
  
    async function postData() {
      const postData = {
        name: post_title.current.value,
        data: {
          "year":post_year.current.value
        },
      };
  
      try {
        const res = await fetch(`${baseURL}/objects`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "Bearer " + x_access,
          },
          body: JSON.stringify(postData),
        });
  
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
  
        const data = await res.json();
  
        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          data: data,
        };
  
        setPostResult(fortmatResponse(result));
      } catch (err) {
        setPostResult(err.message);
      }
    }
  
    async function putData() {
      const id = put_id.current.value;
  
      if (id) {
        const putData = {
          name: put_title.current.value,
          data: {
            "year":update_year.current.value
          }
        };
  
        try {
          const res = await fetch(`${baseURL}/objects/${id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": "Bearer " + x_access,
            },
            body: JSON.stringify(putData),
          });
  
          if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
          }
  
          const data = await res.json();
  
          const result = {
            status: res.status + "-" + res.statusText,
            headers: { "Content-Type": res.headers.get("Content-Type") },
            data: data,
          };
  
          setPutResult(fortmatResponse(result));
        } catch (err) {
          setPutResult(err.message);
        }
      }
    }
  
    // reserved data at https://api.restful-api.dev can't be deleted
    // async function deleteAllData() {
    //   try {
    //     const res = await fetch(`${baseURL}/objects`, { method: "delete" });
  
    //     const data = await res.json();
  
    //     const result = {
    //       status: res.status + "-" + res.statusText,
    //       headers: { "Content-Type": res.headers.get("Content-Type") },
    //       data: data,
    //     };
  
    //     setDeleteResult(fortmatResponse(result));
    //   } catch (err) {
    //     setDeleteResult(err.message);
    //   }
    // }
  
    async function deleteDataById() {
      const id = delete_id.current.value;
  
      if (id){
        try {
          const res = await fetch(`${baseURL}/objects/${id}`, { method: "delete" });
  
          const data = await res.json();
  
          const result = {
            status: res.status + "-" + res.statusText,
            headers: { "Content-Type": res.headers.get("Content-Type") },
            data: data,
          };
  
          setDeleteResult(fortmatResponse(result));
        } catch (err) {
          setDeleteResult(err.message);
        }
      }
    }
  
    const clearGetOutput = () => {
      setGetResult(null);
    }
  
    const clearPostOutput = () => {
      setPostResult(null);
    }
  
    const clearPutOutput = () => {
      setPutResult(null);
    }
  
    const clearDeleteOutput = () => {
      setDeleteResult(null);
    }
  
    
        return (
            <div id="app" className="container my-3">
                <h3>React - REST - json  <span className="ml-5">Data source: https://api.restful-api.dev</span></h3>
            
                <div className="card mt-3">
                    <div className="card-header">GET - dummy data</div>
                    <div className="card-body">
                    <div className="input-group input-group-sm">
                        <button className="btn btn-sm btn-secondary mr-2" onClick={getAllData}>Get All</button>
            
                        <input type="text" ref={get_id} className="form-control ml-5" placeholder="Id" />
                        <div className="input-group-append">
                        <button className="btn btn-sm btn-secondary mr-5" onClick={getDataById}>Get by Id</button>
                        </div>
            
                        <button className="btn btn-sm btn-info ml-2" onClick={clearGetOutput}>Clear</button>
                    </div>   
                    
                    { getResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResult}</pre></div> }
                    </div>
                </div>
            
                <div className="card mt-3">
                    <div className="card-header">POST - dummy data</div>
                    <div className="card-body">
                    <div className="form-group">
                        <input type="text" className="form-control" ref={post_title} placeholder="Name" />
                    </div>
                    
                    <div className="form-group">
                        <input type="text" className="form-control" ref={post_year} placeholder="Year" />
                    </div>
                    <button className="btn btn-sm btn-secondary" onClick={postData}>Post Data</button>
                    <button className="btn btn-sm btn-info ml-2" onClick={clearPostOutput}>Clear</button>
            
                    { postResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{postResult}</pre></div> }
                    </div>
                </div>
            
                <div className="card mt-3">
                    <div className="card-header">PUT - dummy data</div>
                    <div className="card-body">
                    <div className="form-group">
                        <input type="text" className="form-control" ref={put_id} placeholder="Id" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" ref={put_title} placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" ref={update_year} placeholder="Year" />
                    </div>
                    
                    <button className="btn btn-sm btn-secondary" onClick={putData}>Update Data</button>
                    <button className="btn btn-sm btn-info ml-2" onClick={clearPutOutput}>Clear</button>
            
                    { putResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{putResult}</pre></div> }
                    </div>
                </div>
            
                <div className="card mt-3">
                    <div className="card-header">DELETE - POSTED / UPDATED data</div>
                    <div className="card-body">
                    <div className="input-group input-group-sm">
            
                        <input type="text" ref={delete_id} className="form-control ml-2" placeholder="Id" />
                        <div className="input-group-append">
                        <button className="btn btn-sm btn-danger maright" onClick={deleteDataById}>Delete by Id</button>
                        </div>
            
                        <button className="btn btn-sm btn-info ml-2" onClick={clearDeleteOutput}>Clear</button>
                    </div>    
                    
                    { deleteResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{deleteResult}</pre></div> }      
                    </div>
                </div>
     
            </div>
        );
  }


    

export default Home;