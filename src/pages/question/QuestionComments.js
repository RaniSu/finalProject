import React from 'react'
import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from '../../hooks/useFirestore'
import Avatar from '../../components/Avatar'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function QuestionComments({question}) {
    const {updateDocument , response} = useFirestore('questions')
    const [newComment , setNewComment] = useState('')
    const {user} = useAuthContext()

    const handleSumbit = async (e) => {
        e.preventDefault()
        const commentToAdd = {
      displayName : user.displayName,
      photoURL : user.photoURL,
      content : newComment,
      createdAt : timestamp.fromDate(new Date()),
      id : user.uid
       
        }
        await updateDocument(question.id,{
            comments:[...question.comments,commentToAdd]
        })
        if(!response.error){
            setNewComment('')
        }
    }

  return (
    <div className='question-comments'>
        <h4>Comments</h4>
       <ul>
        {question.comments.length > 0 && question.comments.map(comment=>(
            <li key={comment.id}>
                <div className="comment-author">
                    <Avatar src={comment.photoURL}/>
                    <p>{comment.displayName}</p>
                </div>
                <div className="comment-date">
                    <p>{formatDistanceToNow(comment.createdAt.toDate(),{addSuffix:true})}</p>
                </div>
                <div className="comment-content">
                    <p>{comment.content}</p>
                </div>
            </li>
        ))}
       </ul>

        <form  className="add-comment" onSubmit={handleSumbit}>
            <label>
                <span>Add new comment :</span>
                <textarea required onChange={(e)=>setNewComment(e.target.value)} value={newComment}>
                </textarea>
            </label>
            <button className="btn">Add Comment</button>
        </form>
        
    </div>
  )
}
