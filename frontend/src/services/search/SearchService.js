
const SearchService = {

    search: terms => fetch("/search/track", {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, body: 'q=' + encodeURIComponent(terms.join(" "))
    }).then(response => response.json())

}

export {SearchService}
