const urlParams = new URLSearchParams(window.location.search);
const session_id = urlParams.get('sessionId');
console.log("session id is",session_id)

        if (session_id) {
            const links = document.querySelectorAll('.templates a');
            links.forEach(link => {
                const originalHref = link.getAttribute('href');
                // Append sessionId to the href, checking if there's already a query string
                const separator = originalHref.includes('?') ? '&' : '?';
                link.setAttribute('href', `${originalHref}${separator}sessionId=${session_id}`);
            });
        }
