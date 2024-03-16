"use client";
import Link from "next/link";
import { useState, useEffect } from "react";


const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

  const [tags, setTags] = useState([""]);

  // Update tags state when post.tag changes
  useEffect(() => {
    setTags(post.tag || [""]);
  }, [post.tag]);

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
    setPost({ ...post, tag: newTags });
  };

  const addTag = () => {
    setTags([...tags, ""]);
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    setPost({ ...post, tag: newTags });
  };

  return (
    <section className='w-full max-w-full flex-start flex-col mb-7'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea '
            style={{caretColor: "black"}}
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Field of Prompt{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <div>
            {tags.map((tag, index) => (
              <input
                key={index}
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                type='text'
                placeholder='#Tag'
                required
                className='form_input'
              />
            ))}
            <div className="flex gap-2 mx-3 mt-3 -mb-4">
              <button
                type="button"
                onClick={addTag}
                className='px-5 py-1.5 text-sm bg-green-500 rounded-full text-white'
              >
                Add tag
              </button>
              {tags.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTag(tags.length - 1)}
                  className='px-5 py-1.5 text-sm bg-red-500 rounded-full text-white'
                >
                  Remove tag
                </button>
              )}
            </div>
          </div>
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href={type === "Edit" ? "/profile" : "/"} className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
