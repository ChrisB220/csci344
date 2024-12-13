import React, {useState} from "react"

import { postDataToServer, deleteDataFromServer } from "../server-requests";
export default function Bookmark({token, bookmarkId, postId}) {

    const [statebookmarkId, setStateBookmarkId] = useState(bookmarkId);

    async function createBookmark() {
        const sendData = {
            post_id: postId,
        }

        const responseData = await postDataToServer(token, "/api/bookmarks/", sendData);
        setStateBookmarkId(responseData.id);
    }

    async function deleteBookmark() {
        const responseData = await deleteDataFromServer(token, '/api/bookmarks/' + statebookmarkId);
        setStateBookmarkId(null);
    }


    if(statebookmarkId){
        return (
            <button aria-label="Unbookmark This Post" aria-checked="true" aria-role="toggle" onClick={deleteBookmark}>
                <i className="fas fa-bookmark"></i>
            </button>
        );
    } else {
        return (
            <button aria-label="Bookmark This Post" aria-checked="false" aria-role="toggle" onClick={createBookmark}>
                <i className="far fa-bookmark"></i>
            </button>
        );
    }
    
}