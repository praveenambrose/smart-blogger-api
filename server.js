const express = require('express');
const bodyParser = require('body-parser');
const ollamaResponse = require('./utils/ollamaClient');
const connectDB = require('./models/index');
const Post = require('./models/post');

connectDB();

const app = express();

const router = express.Router();

app.use(bodyParser.json());

router.get('/info', (req, res) => {
    res.send({
        name: 'smart-blogger-api',
        version: '1.0.0'
    });
});

router.get('/health', (req, res) => {
    res.send('Application is healthy!');
});

router.post('/blogger-ideas', (req, res) => {
    console.log('Received request:', req.body);
    ollamaResponse(req.body.topic)
        .then(response => {
            res.send({
                status: 200,
                content: response
            })
        })
        .catch(() => {
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            });
        })
});

router.post('/save-post', (req, res) => {
    const { topic, post } = req.body;
    if (!topic || !post) {
        return res.status(400).send({
            status: 400,
            message: 'Topic and post content are required'
        });
    }

    const newPost = new Post({ topic, post });

    newPost.save()
        .then(() => {
            res.send({
                status: 200,
                message: 'Post saved successfully'
            });
        })
        .catch(error => {
            console.error('Error saving post:', error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            });
        });
});

router.get('/posts', (req, res) => {
    Post.find()
        .then(posts => {
            res.send({
                status: 200,
                posts: posts.map(post => {
                    return {
                        id: post._id,
                        topic: post.topic,
                        post: post.post
                    };
                })
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            });
        });
});

router.delete('/delete-post/:id', (req, res) => {
    const postId = req.params.id;

    Post.findByIdAndDelete(postId)
        .then(deletedPost => {
            if (!deletedPost) {
                return res.status(404).send({
                    status: 404,
                    message: 'Post not found'
                });
            }
            res.send({
                status: 200,
                message: 'Post deleted successfully'
            });
        })
        .catch(error => {
            console.error('Error deleting post:', error);
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error'
            });
        });
});


app.use('/smart-blogger-api', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});