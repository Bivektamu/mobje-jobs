import { getUserIds } from "../../components/context/actions/UserActions";
import { useEffect } from "react";

export async function getStaticPaths() {
  const res = await getUserIds();

  if (res) {
    console.log(res)

    const paths = [
      {
        params: {'id': '1'},
      },
      {
        params: {'id': '2'},
      },
    ]

    return {
      paths,
      fallback: false,
    };
  }

}

const Page = (props) => {
  //   useEffect(() => {
  //     const getAll = async () => {
  //       const res = await getUserIds();
  //       if (res) {
  //         const paths = res.map((id) => ({
  //             params: { id }
  //           }));
  // 
  //           console.log(paths)
  //       }
  // 
  //     };
  //     getAll();
  //   }, []);

  return <div>Page</div>;
};

export default Page;
