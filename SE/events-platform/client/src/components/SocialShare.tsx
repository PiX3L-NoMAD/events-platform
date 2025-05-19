import {
  FaTwitter,
  FaFacebookF,
  FaWhatsapp,
} from 'react-icons/fa';

interface SocialShareProps {
  url: string;
  title: string;
}

export default function SocialShare({
  url,
  title,
}: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className='mt-8 flex space-x-4'>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Share on Twitter'
      >
        <FaTwitter size={20} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Share on Facebook'
      >
        <FaFacebookF size={20} />
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Share on WhatsApp'
      >
        <FaWhatsapp size={20} />
      </a>
    </div>
  );
}
