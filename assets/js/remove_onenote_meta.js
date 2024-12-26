function remove_onenote_meta() {
    let es = document.getElementsByClassName("WordSection1");
    if (!es || es.length == 0) {
        console.log("wired");
        return;
    }
    let e = es[0];
    console.log(e);
    if (e.children.length >= 3) {
        for (let i = 2; i >= 0; i--) { // Remove first 3 children (indices 0, 1, 2)
            e.removeChild(e.children[i]);
        }
    };
    console.log("hello world");
}
remove_onenote_meta();