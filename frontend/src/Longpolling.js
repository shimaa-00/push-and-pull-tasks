import React , {useEffect, useState} from 'react'
const backUrl = 'http://localhost:3000';
function Longpolling() {
   
    const [message,setMessage]=useState('');

    const [messages,setMessages]=useState([]);

    const data = () =>{
       
            fetch(`${backUrl}/long-messages-sub`).then(res => res.json())
                .then(data => setMessages(messages.concat(data))).catch(console.log);
         
        
    }

    useEffect(() => {
       data();
    },[messages]);

    
    const handleSubmit = (e)=>{
        e.preventDefault();
        fetch(`${backUrl}/long-messages`,{
            method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify({message})
        }
        ).then(res =>{
            setMessage("");
        }).catch(console.log)
    }
  return(
      <>
      <div className="form-wrapper" >
          <form id="form" className="validate my-3" style={{textAlign:'center'}} onSubmit={handleSubmit}>
              <div className="form-field">
                  <label className="mx-2"> Message </label>
                  <input type='text' name='message' id='message' placeholder="message" value={message} onChange={e => setMessage(e.target.value)}/>
              </div>
          </form>
      </div>
      <section>
          <div style={{textAlign:'center'}}>
              <h2>Messages</h2>
              <ul style={{listStyleType:'none'}}>
                  {messages.map((msg,index) => <li key={index}>{msg.message}</li>)}  
              </ul>
          </div>
      </section>
      </>
    );
  }
  
  export default Longpolling;