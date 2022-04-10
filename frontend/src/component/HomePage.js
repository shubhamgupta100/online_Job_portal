import React from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";
import MakeCard from "./MakeCard";
export default function HomePage({ auth }) {
  const cardData = [
    {
      id: 1,
      name: "Shubham",
      title: "(Jr. Software Enginner at TagHive)",
      content: `I was struggling to get an internship in my final year tried
             at many places but did not able to find any then I got to know about this particuler
              platerform within 20 days I got shotlisted for a company `,
      imgLink:
        "https://i.pinimg.com/originals/04/89/14/048914010d5f51b8003f885958be785b.jpg",
    },
    {
      id: 2,
      name: "Anish  Singh",
      title: "(Software Developer at Real11)",
      content: `I was struggling to get an internship in my final year tried
             at many places but did not able to find any then I got to know about this particuler
              platerform within 20 days I got shotlisted for a company `,
      imgLink:
        "https://i.pinimg.com/736x/1a/76/88/1a768897580b2938c7483e4a24e2514e--hot-actors-actors-male.jpg",
    },
    {
      id: 3,
      name: "John Doe",
      title: "(ML expert at Argoid)",
      content: `I was struggling to get an internship in my final year tried
             at many places but did not able to find any then I got to know about this particuler
              platerform within 20 days I got shotlisted for a company `,
      imgLink:
        "https://i.pinimg.com/222x/77/8e/0f/778e0f0002209c1a0aa4ac0019b703dc.jpg",
    },
    {
      id: 4,
      name: "James Doe",
      title: "(frontend Developer at Real11)",
      content: `I was struggling to get an internship in my final year tried
             at many places but did not able to find any then I got to know about this particuler
              platerform within 20 days I got shotlisted for a company `,
      imgLink:
        "https://eddie-hernandez.com/wp-content/uploads/2019/08/young-mens-professional-business-suit-linkedin-headshot-01.jpg",
    },
    {
      id: 5,
      name: "Navneet Nigam",
      title: "(Backend Developer intern at TagHive)",
      content: `I was struggling to get an internship in my final year tried
             at many places but did not able to find any then I got to know about this particuler
              platerform within 20 days I got shotlisted for a company `,
      imgLink:
        "https://images.unsplash.com/photo-1600878459138-e1123b37cb30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHw%3D&w=1000&q=80",
    },
    {
      id: 6,
      name: "Amit Gupta",
      title: "(Software Developer  at OnsiteGo)",
      content: `I was struggling to get an internship in my final year tried
             at many places but did not able to find any then I got to know about this particuler
              platerform within 20 days I got shotlisted for a company `,
      imgLink:
        "https://png.pngtree.com/thumb_back/fh260/background/20210903/pngtree-business-day-professional-mens-office-notebook-photography-map-with-map-image_801088.jpg",
    },
  ];
  return (
    <div className="home_page_container">
      <div className="hero_container">
        <div>
          <h3>
            Welcome to Online Job Portal Here You can find internships/full time
            job in early aged starups
          </h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          {auth !== null ? (
            <Link to="/browse">
              <button>
                Browse Internship/Jobs
                <span className="forward_arrow">
                  <ArrowForwardIcon style={{ color: "white" }} />
                </span>
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button>
                Sign In to browse Jobs
                <span className="forward_arrow">
                  <ArrowForwardIcon style={{ color: "white" }} />
                </span>
              </button>
            </Link>
          )}
        </div>
        <div>
          <img
            // src="https://coda.newjobs.com/api/imagesproxy/ms/niche/images/articles/EducationSector.jpg"
            src="https://i.pinimg.com/550x/b1/a4/54/b1a454ca7807d544e53e1454a694be6e.jpg"
            alt="homepageimage"
          />
        </div>
      </div>
      <div className="card_container">
        <div className="text_center">
          <h3
            className="border_bottom_text"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            What students has to say about us
          </h3>
        </div>
        <div className="second_row">
          {cardData.map((item, index) => {
            return (
              <MakeCard
                name={item.name}
                title={item.title}
                content={item.content}
                imgLink={item.imgLink}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
