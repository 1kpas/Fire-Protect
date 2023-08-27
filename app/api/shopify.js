

// Funções para Injetar/Desinjetar:

import axios from "axios";

// script_tag: {
//     event: "onload",
//     src: scriptSrc
// }

/**
 * 
 * @param {{
 *  script_tag: {
 *  event: "onload",
 *  src: string
 * }
 * }} data 
 * @param {{
 *  accessToken: string
 *  baseUrl: string
 * }} shopifyData
 * @returns 
 */
export const setScript = async (data, shopifyData) => {
    return await axios.post(`${shopifyData.baseUrl}/admin/api/2023-07/script_tags.json`, {
        data
    }, {
        headers: {
            "X-Shopify-Access-Token": shopifyData.accessToken,
            "Content-Type": "application/json",
            "Origin": shopifyData.baseUrl
        }
    })
}

/**
 * 
 * @param {{
*  script_id: number
* }} data 
 * @param {{
*  accessToken: string
*  baseUrl: string
* }} shopifyData
* @returns 
*/
export const removeScript = async (data, shopifyData) => {
    return await axios.delete(`${shopifyData.baseUrl}/admin/api/2023-07/script_tags/${data.script_id}.json`, {
        headers: {
            "X-Shopify-Access-Token": shopifyData.accessToken,
            "Content-Type": "application/json"
        }
    })
}

// Scripts específicos:

const scripts = {
    blockF12: `
        <script>
            document.onkeydown = function(e) {
                if (e.keyCode === 123) {
                    return false;
                }
            }
        </script>
    `,
    blockContent: `
        <script>
            document.oncontextmenu = function() {
                return false;
            }
            document.onselectstart = function() {
                return false;
            }
        </script>
    `,
    blockCopy: `
        <script>
            document.onkeydown = function(e) {
                if (e.ctrlKey && e.keyCode === 67) {
                    return false;
                }
            }
        </script>
    `,
    blockSource: `
        <script>
            document.onkeydown = function(e) {
                if (e.ctrlKey && e.keyCode === 85) {
                    return false;
                }
            }
        </script>
    `,
    blockDevTools: `
        <script>
            document.onkeydown = function(e) {
                if (e.ctrlKey && (e.keyCode === 73)) {
                    return false;
                }
            }
        </script>
    `
};