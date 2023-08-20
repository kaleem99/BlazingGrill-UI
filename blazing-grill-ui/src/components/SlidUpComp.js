// SlideUpComponent.js
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import MenuItemsSection from "../frontend/data/menuSections";
import fetchPost from "../helpers/fetchData";
import menu from "../assets/menu.svg";
import Draggable from "react-draggable";

const SlideUpComponent = ({ itemState, setItemState }) => {
  const [isOpen, setIsOpen] = useState(false);
  let elementStyle = document.getElementsByClassName("sliderComp");
  const toggleSlide = () => {
    if (isOpen) {
      elementStyle[0].style.top = "0px";
    }
    setIsOpen(!isOpen);
    console.log(elementStyle);
  };
  const handleClickChange = (name, setItemState) => {
    setItemState("");
    fetchPost(name, setItemState);
    setIsOpen(!isOpen);
  };
  return (
    // <Draggable disabled={!isOpen}>
    <div
      style={
        isOpen
          ? {
              width: "50%",
              height: "90%",
              bottom: 0,
              borderRadius: "20px",
              right: "20px",
            }
          : {}
      }
      className="sliderComp"
    >
      {isOpen && <h3 className="MainMenuHeader">Main Menu</h3>}
      <div
        style={
          isOpen
            ? {
                padding: "0px",
                width: "80px",
                height: "40px",
                marginTop: "10px",
                marginLeft: "auto",
                marginRight: "10px",
                borderRadius: "10px",
                fontSize: "30px",
              }
            : {}
        }
        onClick={() => toggleSlide()}
        className="slide-up-content"
      >
        {/* Content of the sliding component */}
        <img style={{ height: "100%" }} src={menu} />
      </div>

      {isOpen && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            margin: "2.5% auto",
            overflowX: "auto",
            height: "90%",
          }}
        >
          {MenuItemsSection.slice(0, MenuItemsSection.length - 1).map(
            (item) => {
              return (
                <div
                  className="menuNameImage"
                  onClick={async () =>
                    await handleClickChange(item.name, setItemState)
                  }
                >
                  <img alt="" className="sliderImage" src={item.img}></img>
                  <text className="sliderItemName">{item.name}</text>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
    // </Draggable>
  );
};

export default SlideUpComponent;
