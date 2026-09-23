import {motion } from "motion/react";
import React, { useEffect, useState } from "react";

function LoadingAnimation() {
    const Thinking_Labels = ["Thinking","Analyzing","Reasoning","Generating"]
    const [labelIndex, setLabelIndex] = useState(0)
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            setLabelIndex((prev)=>(prev+1)%Thinking_Labels.length)
        },1800)
        return ()=>clearInterval(interval)
    },[])

    const label = Thinking_Labels[labelIndex]

  return (
    <div className="flex items-center gap-3 max-w-[72%] py-1">
      <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
        {[0, 0.45, 0.9].map((delay, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-cyan-400/30"
            initial={{ scale: 0.3, opacity: 0.55 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay,
              ease: "easeOut",
            }}
          />
        ))}
        <motion.span
          className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-300 to-violet-400"
          style={{boxShadow: "0 0 14px rgba(125,211,252,0.55)"}}
          animate={{ scale: [1,1.25,1] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
          {label}

    </div>
  );
}

export default LoadingAnimation;
