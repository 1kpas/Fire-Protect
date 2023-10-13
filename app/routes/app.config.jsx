import { authenticate } from "~/shopify.server";

export const loader = async ({ request }) => {
    await authenticate.admin(request);
  };

export default function Config(){
    <div style={{width: 200, height: 200, background: 'red'}}></div>
}