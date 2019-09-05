import { useEffect } from "react";
import { TimelineLite } from "gsap";

import ScrollMagic from "scrollmagic-compat"

let globalController;

const unit = (n) => typeof n == "number" ? n + "px" : n;

function sceneFrom(props){
  let {
    trigger,
    hook = 0,
    offset,
    duration,
    debug
  } = props;

  const config = {
    triggerElement: trigger,
    triggerHook: hook,
  };

  if(duration)
    config.duration = unit(duration)
      
  if(offset)
    config.offset = unit(offset)
    
  const scene = new ScrollMagic.Scene(config);

  if(debug)
    scene.addIndicators();

  scene.addTo(globalController);

  return scene;
}

export const ScrollProvider = ({ children }) => {
  useScrollMagic();
  return children;
}

export const OnScroll = (props) => {
  useEffect(() => {
    let { toggle, active = "active" } = props;
    sceneFrom(props).setClassToggle(toggle, active);
  }, [])
  return false;
}

const Injectable = (Using) => 
  (props) => {
    useEffect(() => {
      const init = props.children;
      if(typeof init !== "function")
        throw new Error("A function is required to be only child in a Timeline element.")

      const scene = sceneFrom(props)
      const tweenLike = new Using();
      init(tweenLike);
      scene.setTween(tweenLike);
    }, []);
    return false
  }

export const getController = () => globalController;

export const useScrollMagic = () => {
  if(!globalController)
    globalController = new ScrollMagic.Controller();

  useEffect(() => () => {
    if(globalController)
      globalController.destroy(true);
  }, [])
}

export const useScene = (config) => {
  useEffect(() => {
    new Scene(config).addTo(globalController);
  }, [])
}

export const Timeline = Injectable(TimelineLite);