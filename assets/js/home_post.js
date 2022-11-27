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
                    console.log(data);
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    // After submitting data recieve in post controller
    createPost();
}