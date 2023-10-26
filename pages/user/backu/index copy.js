import { getUserById } from "../../../components/context/actions/UserActions";

export async function getStaticPaths() {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps({ params }) {
  // Fetch data based on the dynamic parameter (id)
  const userId = params.id;

  const res = await getUserById(userId)

  if(res) {
    console.log('res')
  }

  return {
        props: {
          userData: {a: '1', b: '2'},
        },
      };
  // if(res) {
  //   const userData = res.data.user
  //   return {
  //     props: {
  //       userData,
  //     },
  //   };
  // }
  // else {
  //   throw new Error('User not found')
  // }

}
const Page = ({params}) => {
    console.log(params)
  return <div>Page</div>;
};

export default Page;
