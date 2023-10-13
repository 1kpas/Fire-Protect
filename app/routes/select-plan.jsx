import { authenticate } from "~/shopify.server";

export async function loader({request}) {
    await authenticate.admin(request);
  
    return null;
  }

export default function SelectPlan(){
    return (<div style={{width: 200, height: 200, background: 'blue'}}></div>)
}