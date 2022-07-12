import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import { Flex, Image, Button } from "@chakra-ui/react";
import { FaInstagram } from 'react-icons/fa';
import { AnimatePresence, motion, useMotionValue, useVelocity } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        x: 300,
    },
    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: -300,
    },
    hover: {
        scale: 1.2,
        x: 0,
        opacity: 1,
    },
    rest: {
        opacity: 1,
        x: 0,
    },
}

interface ImageInfo {
    imageSrc: string;
    alt: string;
    desc: string;
}

const images: ImageInfo[] = [
    {
        imageSrc: '/static/general1.jpg',
        alt: 'Cheesecake Connect',
        desc: 'delicous cheesecake 1',
    },
    {
        imageSrc: '/static/general2.jpg',
        alt: 'Cheesecake Connect',
        desc: 'delicous cheesecake 2',
    },
    {
        imageSrc: '/static/general3.jpg',
        alt: 'Cheesecake Connect',
        desc: 'delicous cheesecake 3',
    },
    {
        imageSrc: '/static/general4.jpg',
        alt: 'Cheesecake Connect',
        desc: 'delicous cheesecake 4',
    },
    {
        imageSrc: '/static/general5.png',
        alt: 'Cheesecake Connect',
        desc: 'delicous cheesecake 5',
    },
    {
        imageSrc: '/static/general6.png',
        alt: 'Cheesecake Connect',
        desc: 'delicous cheesecake 6',
    },
];
type SlideshowImageProps = ImageInfo & {
    onImageHover: (desc: string | null) => void;
}

const SlideshowImage: React.FC<(SlideshowImageProps)> = (props: (SlideshowImageProps)) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const {
        onImageHover
    } = props;
    const divProps = {
        initial: 'initial',
        exit: 'out',
        variants: pageVariants,
        animate: isHover ? 'hover' : 'rest',
        onHoverStart: () => {
            onImageHover(props.desc);
            setIsHover(true);
        },
        onHoverEnd: () => {
            onImageHover(null);
            setIsHover(false);
        },
        style: {
            width: '20%'
        }
        // key: pathname,
    };
    const imageStyle: CSSProperties = {
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        pointerEvents: 'none',
    };
    return (
        <motion.div {...divProps}>
            <Image src={props.imageSrc} alt={props.alt} style={imageStyle} draggable={false} onDragStart={()=>{}}/>       
        </motion.div>
    );
};
const slideshowAmount = 3;
export const Slideshow: React.FC<any> = (props: any) => {
    const [description, setDescription] = useState<string | null>(null);
    const [pos, setPos] = useState<number>(0);
    const [width, setWidth] = useState(0);
    const x = useMotionValue(-width);
    const velocity = useVelocity(x);
    const [paused, setPaused] = useState<boolean>(false);
    const [drag, setDrag] = useState<'x' | false | 'dragging'>('x'); // 3 states (initial) (during drag) (no drag for reset)
    // pos ranges from 0 to images.length - 1
    const nextSlide = () => {
        setPos((currentPos) => {
            if (currentPos + slideshowAmount < images.length) {
                console.log('updating to', currentPos + slideshowAmount);
                return currentPos + slideshowAmount;
            } else {
                console.log('updating to', currentPos + slideshowAmount - images.length);
                return currentPos + slideshowAmount - images.length;
            }
        });
    };

    useEffect(() => {
        if (x.get() > 0) {
            x.set(x.get()-width);
        }
    }, [pos]);

    useEffect(() => {
        x.set(-width);
    }, [width]);

    useEffect(() => {
        if (paused || drag === 'dragging') return;
        console.log('timeout start');
        if (!width) {
            setWidth(document.getElementById('carousel').offsetWidth);
        }
        x.onChange((value) => {
            if (value > 0) {
                // x.set(value-width);
                // reset order
                nextSlide();
            }
        });
        const timer = setInterval(() => {
            x.stop();
            x.set(x.getPrevious()+2);
            // console.log('timeout called', slideshowPos);
        }, 10);
        return () => {
            console.log('timeout ended');
            clearInterval(timer);
        }
    }, [paused, drag, width]);
    
    const slideshowImages = useMemo(() => {
        // pos determines the first element only
        const format = pos ? images.slice(pos, images.length).concat(images.slice(0, pos)) : images;
        console.log(format);
        return format;
        // if (pos + slideshowAmount > images.length) {
        //     console.log(pos, images.length, '->', 0, images.length-pos);
        //     return images.slice(pos, images.length).concat(images.slice(0, (slideshowAmount - (images.length - pos))));
        // } else {
        //     console.log(pos, pos + slideshowAmount);
        //     return images.slice(pos, pos + slideshowAmount);
        // }
    }, [pos]);

    const onImageHover = (desc: string | null) => {
        setDescription(desc);
        if (desc) {
            setPaused(true);
        } else {
            setPaused(false);
        }
    }

    useEffect(() => {
        console.log(`drag = ${drag}`)
        if (drag === false) {
            setTimeout(() => {
                setDrag('x');
            }, 3000);
        }
    }, [drag]);

    const onDragEnd = () => {
        setTimeout(() => {
            setDrag(false);
        }, 10);
    }

    const motionDivProps = {
        id: 'carousel',
        style: {
            x,
            border: '1px black solid', 
            margin: '0px 0px 50px 0px' 
        },
        drag: drag === 'dragging' ? 'x' : drag,
        onDragStart: ()=>{ setDrag('dragging'); },
        onDragEnd,
        onDrag: () => {
            const width = document.getElementById('carousel').offsetWidth;
            if (x.get() > width) {
                x.set(x.get()-width);
            }
        },
    };

    return (
        <Flex marginTop= '20vh' maxWidth='40%' direction="column" dir="center" justify="center">
            <motion.div {...motionDivProps}>
                <Flex direction="row" style={{width: `${100*images.length/slideshowAmount}%`}}>
                    <AnimatePresence>
                    {
                        slideshowImages.map((item => 
                            <SlideshowImage {...item} onImageHover={onImageHover} />
                        ))
                    }
                    </AnimatePresence>
                </Flex>
            </motion.div>
            <Flex dir='row'>
                {description}
            </Flex>
            <Button onClick={nextSlide}>next</Button>
        </Flex>
    );
}

export default Slideshow;