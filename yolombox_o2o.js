// ==UserScript==
// @name         yolombox_o2o
// @namespace    http://tampermonkey.net/
// @version      2024-12-07
// @description  O2O省钱计划
// @author       yolombox
// @match        https://javdb.com/*
// @match        https://www.javdb.com/*
// @match        https://www.javbus.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=javdb.com
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @resource     iconLucide https://unpkg.com/lucide@latest // 将链接替换为你的CSS文件链接
// @require      https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js
// ==/UserScript==

(function() {
    'use strict';


    function findElementsWithAttribute(element, attribute) {
        let matchingElements = [];
        if (element.hasAttribute(attribute)) {
            matchingElements.push(element);
        }
        for (let i = 0; i < element.children.length; i++) {
            matchingElements = matchingElements.concat(findElementsWithAttribute(element.children[i], attribute));
        }
        return matchingElements;
    }

    const currentUrl = window.location.href;
    if(currentUrl.indexOf('javdb.com') > -1) {
        const moviePanelInfo = document.querySelector('nav.movie-panel-info');



        const elements = findElementsWithAttribute(moviePanelInfo, 'data-clipboard-text');

        let noDom = elements[0];
        if(noDom){
            // 你的脚本代码
            const queryNo = noDom.getAttribute('data-clipboard-text')
            axios.get('http://127.0.0.1:3030/api/search?series_no='+queryNo)
            .then(function (response) {
                const resObj = response.data;
                if(resObj.status === 'success' && resObj.data !== undefined && resObj.data.length > 0) {
                    noDom.insertAdjacentHTML('afterend', `
                        <span class="value" style="color:red">
                        本地已有
                        </span>
                    `);
                }



            })
            .catch(function (error) {
                console.error(error);
            });
        }

    } else if(currentUrl.indexOf('javbus.com') > -1){
        const firstElements = document.querySelector('.info').querySelector('p').querySelectorAll('span');
        if(firstElements && firstElements.length > 1) {
            const queryNo = firstElements[1].innerText;

            axios.get('http://127.0.0.1:3030/api/search?series_no='+queryNo)
            .then(function (response) {
                const resObj = response.data;
                if(resObj.status === 'success' && resObj.data !== undefined && resObj.data.length > 0) {
                    firstElements[1].insertAdjacentHTML('afterend', `
                        <span style="color:#CC0000;">本地已有</span>
                    `);
                }



            })
            .catch(function (error) {
                console.error(error);
            });

        }
        


    }





})();
