import Image from "next/image";

type Post = {
  title: string;
  post: string;
  imagesId?: string[];
};

type Props = {
  post: Post;
};

const PostContent = ({ post }: Props) => {
  const { title, post: body, imagesId } = post;

  return (
    <div className="text-foreground">
      <h3 className="heading-tertiary">{title}</h3>

      <div className="text-x16 mb-3">{body}</div>

      {imagesId && imagesId.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {imagesId.map((image) => (
            <Image
              key={image}
              src={image}
              alt={`Image ${image}`}
              width={500}
              height={300}
              className="rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContent;
