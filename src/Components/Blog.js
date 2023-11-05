//Blogging App using Hooks
import { useState, useRef, useEffect, useReducer } from "react";
import { db } from "./firebaseinit";
import { collection, addDoc } from "firebase/firestore"; 


function blogReducer(state,action){
    switch(action.type){
        case "ADD":
            return [action.blogs,...state];
        case "Remove":
            return state.filter((blogs,index)=> index !== action.index);
        default :
        return [];   

    }

}



export default function Blog(){
    // const [title, setTitle] = useState("");
    // const [content,setContent] = useState("");
    const [fromData,setFromData] = useState({title:"",content:""})
    // const [blogs,setBlogs] = useState([]);
    const [blogs,dispatch] = useReducer(blogReducer,[]);
    const titleRef = useRef(null);


    useEffect(()=>{
        titleRef.current.focus();
    },[]);

    useEffect(()=>{
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title;
        }
        else{
            document.title = "No Blogs!!";
        }
    },[blogs])
    
    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e){
        e.preventDefault();
        // setBlogs([{title:fromData.title,content:fromData.content},...blogs]);
        dispatch({type:"ADD",blogs:{title:fromData.title,content:fromData.content}})
        
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "blogs"), {
        title: fromData.title,
        content: fromData.content,
        CreatedOn: new Date()
        });
        console.log("Document written with ID: ", docRef.id);

  


        // setTitle("");
        // setContent("");
        setFromData({title:"",content:""});
        titleRef.current.focus();
        console.log(blogs);
    }
    function removeBlog(i){
    //  setBlogs(blogs.filter((blogs,index)=> i!==index));
    dispatch({type:"Remove",index:i})
    }

    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={fromData.title}
                                ref={titleRef}
                                onChange={(e)=> setFromData({title:e.target.value,content:fromData.content})}/>

                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={fromData.content}
                                required
                                onChange={(e)=> setFromData({title:fromData.title ,content:e.target.value})}/>
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((e,i)=>(
            <div className="blog" key={i}>
                <h3>{e.title}</h3>
                <p>{e.content}</p>
                 
                 <div className="blog-btn">
                    <button onClick={()=>removeBlog(i)}className="btn remove">Delete</button>
                 </div>
            </div>
        ))}
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
