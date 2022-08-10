import _ from "lodash";


/**
* Check if target is null or undefined
* @param {any} target - object
* @return {bool} is function
*/
export const isNil = (target: any): boolean => {
    return (target == null || target === undefined);
};

/**
 * check if array and length > 1
 * @param item 
 * @returns 
 */
export const isArray = (item: any): item is any[] => {
    
    return !isNil(item) && _.isArray(item) && item.length > 0;
}