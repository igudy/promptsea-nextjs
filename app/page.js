import React from "react";
import Feed from "@components/Feed";

const Home = () => {
  return <div>
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptsea is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </p>

      {/* Feed */}
      <Feed />
    </section>
  </div>
}

export default Home
