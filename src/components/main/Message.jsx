import React from "react";

const Message = ({message, imageURL="", owner=false, Time}) => {

    return (
        <div className={`max-sm:w-3/4 w-2/3 m-3 flex box-content ${owner ? "flex-row-reverse ml-72 max-lg:ml-32 " : ""}`}>
            <div>
                <img
                    src={`${owner? "https://imgs.search.brave.com/KbAjSqAcd2-s7mAlmxWrEj-ge7W7F3xI7acc9aLJv8k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzIyLzcxLzI0/LzM2MF9GXzYyMjcx/MjQ0NF9VRjZEOTNw/aUVTNVc0dkJnbjBL/RndVeGVyZGFpdXpa/cC5qcGc" : "https://imgs.search.brave.com/5W7AHsPaJKKEa0sldORzG7ojJejOJAF3VPAXZlgBOfg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ha25z/LWltYWdlcy5lb25s/aW5lLmNvbS9lb2xf/aW1hZ2VzL0VudGly/ZV9TaXRlLzIwMTc3/MTcvcnNfMTAyNHg2/ODItMTcwODE3MDU0/MzMwLTEwMjQudGhv/ci1yYWduYXJvay44/MTcxNy5qcGc_Zml0/PWFyb3VuZHw3NzY6/NTE3Jm91dHB1dC1x/dWFsaXR5PTkwJmNy/b3A9Nzc2OjUxNztj/ZW50ZXIsdG9w" }`}
                    alt=""
                    className="rounded-full object-cover h-10 w-10 mr-10"
                />
                <p className="text-xs text-slate-300">{Time}</p>
            </div>

            <div className={` px-8 py-3  rounded-br-lg rounded-bl-lg text-slate-200 ${owner ? "rounded-tl-lg mr-10 bg-green-800" : "rounded-tr-lg bg-slate-700"}`}>
                {imageURL &&
                <img
                    src={imageURL}
                    className={`rounded-lg w-1/3 aspect-square mb-4`}
                />
                }
                <p className="">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default Message;
