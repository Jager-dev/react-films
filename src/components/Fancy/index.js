import React, {useState} from 'react';
import ModalVideo from 'react-modal-video'



const Fancy = ({id}) => {
  const [isOpen, setOpen] = useState(false)
//  https://www.themoviedb.org/t/p/w533_and_h300_bestv2/nDLylQOoIazGyYuWhk21Yww5FCb.jpg
  return (
    <div>
            <>
              <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={id} onClose={() => setOpen(false)} />

              <button className="btn-primary" onClick={()=> setOpen(true)}>View Trailer</button>
            </>
    </div>
  );
};

export default Fancy;