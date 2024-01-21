import React, { Suspense } from "react";

import styles from "./singlePost.module.css";
import Image from "next/image";
import PostUser from "@/components/postUser/postUser";
import { getPost } from "@/lib/data";

// const getData = async (slug) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);

//   if(!res.ok){
//     throw new Error("Something wen wrong")
//   }

//   return res.json()
// }

export const generateMetadata = async({params}) => {
  const {slug} = params

  const post = await getPost(slug)

  return {
    title: post.title, 
    description: post.desc
  }
}

const SinglePostPage = async ({ params }) => {
  console.log(params);

  const { slug } = params;
  // console.log(slug);
  const post = await getPost(slug);
  // console.log(post);

  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
          <Suspense fallback={<div>Loading...</div>}>
          <PostUser userId = {post.userId} />
          </Suspense>)
          }

          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
