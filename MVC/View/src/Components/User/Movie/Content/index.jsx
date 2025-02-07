import React from 'react'
import './Content.css'
import { FaStar } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoPlayOutline } from "react-icons/io5";

function index() {
    return (
        <div>
            <div className="content-blur">

            </div>

            <section id='movcontent'>

                <div className="mcontent-up">
                    <div className="mcontent-video">
                        <iframe src='http://video.sibnet.ru/shell.php?videoid=4532350&share=1'></iframe>
                    </div>
                </div>
                <div className="mcontent-low">
                    <div className="mcl-left">
                        <div className="mcl-header">
                            <h2><p>Demon Slayer: Kimetsu no Yaiba : Season 1 </p> <span>4.9 <FaStar className='star' /> 200 <IoEye /> </span></h2>
                        </div>
                        <div className="mcl-l-tags">
                            <span> 18+ </span>
                            <span> HD </span>
                            <span> 2029</span>
                            <span> Anime </span>
                            <span> 1hr 45m</span>
                        </div>
                        <div className="mcl-info">
                            <h2>About the Story</h2>
                            <p>Flame Hashira Kyojuro Rengoku receives new orders: Travel to the Mugen Train, where over forty people have
                                gone missing, and conduct an investigation. Leaving the Demon Slayer Corps Headquarters, he sets off on this
                                new mission.
                            </p>

                        </div>

                        <h6><span>Staring:</span>  Natsuki Hanae, Akari Kito, Hiro Shimono</h6>
                        <h6><span>Language:</span> Japanese, English, English (India), Español (América Latina)</h6>
                        <h6><span>Subtitles:</span>  Japanese, English</h6>

                        <button><IoPlayOutline/> Play</button>

                    </div>
                    <div className="mcl-right">
                            <h2>
                            About
                            </h2>

                            <h6><span>Type:</span> Movie</h6>
                            <h6><span>Director:</span> Bones</h6>
                            <h6><span>Date aired:</span> Jan 15, 2022</h6>
                            <h6><span>Status:</span> Completed</h6>
                            <h6><span>Country:</span> Japan</h6>
                            <h6><span>Premiered:</span> Winter 2022</h6>
                            <h6><span>Duration:</span> 120 min</h6>

                            <div className="genre">
                                <h4>Genre:</h4>
                                <p><span>Action</span> <span>Thriller</span> <span> Sci-Fi</span> <span>Cyberpunk</span> <span>Shounen</span></p>
                            </div>
                    </div>
                </div>

                <hr />
            </section>
        </div>
    )
}

export default index
