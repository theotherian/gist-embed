##How to use gist-embed to spice up code snippets on your blog

### Include jQuery:

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>

### Include gist-embed (If your blog doesn't accept local file includes, then simply copy paste the contents into a script tag):

    <script type="text/javascript" src="gist-embed.js"></script>

### Add a code element to your page with an id attribute in the following format:

    "gist-<gist-id>"
	e.g.:
    <code id="gist-1741"></code>
    <code id="gist-4147951" data-file="file1.txt"></code>