import { useEffect, useState } from "react";

const Headers = (props) => {
  const [title] = useState(props.title)

  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);
	
}

export default Headers