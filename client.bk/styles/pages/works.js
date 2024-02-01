import Content from "../comps/Content";
import MetaTags from "../comps/MetaTags";
import content from "../data/works.json";

function Works() {
  return (
    <>
      <MetaTags
        title="What We Do"
        description="Since 2011, SmallWorld has remained focused on their vision of building a vibrant startup community in Phnom Penh through partnering with other area workspace groups to offer greater value and accessibility to early stage startup teams and entrepreneurs."
        canonical="https://smallworldventure.com/works"
        thumbnail="https://smallworldventure.com/images/thumbnail/work.png"
      />
      <div className="container">
        {content.map((res, index) => {
          return <Content key={index} content={content[index]} />;
        })}
      </div>
    </>
  );
}

export default Works;
