/*
* Recursively merge properties of two objects
* I have stolen this from "blessed-contrib->utils" 🙃
*/
export function mergeRecursive(obj1, obj2) {
  if (!obj1) return obj2;
  if (!obj2) return obj1;
  for (var p in obj2) {
    try {
      // property in destination object set; update its value
      if (obj2[p].constructor==Object) {
        obj1[p] = mergeRecursive(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch(e) {
      // property in destination object not set; create it and set its value
      obj1[p] = obj2[p];
    }
  }
  return obj1;
}
