{
    // function which send the data to server
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();
            // submit using ajax
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(), // convert form data into json
                success: function (data) {
                    let newPost = newPostDom(data.data.post)
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($('delete-post-button', newPost))
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    // After submitting data recieve in post controller
    // method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
                        <p>
                            <small>
                                <a class="delete-post-button" href="posts/destroy/${post._id}">X</a>
                            </small>
                            ${post.content }
                            <br>
                            <small>
                            ${post.user.name}
                            </small>
                        </p>
                    
                    <div class="post-comments">
                        <form action="/comment/create" method="POST">
                            <input type="text" name="content" placeholder="Type here to add Comment...">
                            <!--  send the id of post -->
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form>
                        <div class="post-comments-list">
                            <ul id="post-comment-${post._id}">
                            
                            </ul>
                        </div>
                    </div>
                    </li>
                `)
    }
    // function to delete the post
    let deletePost = function (deleteLink) {
        $('deleteLink').click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post._id}`).remove();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }
    createPost();
}