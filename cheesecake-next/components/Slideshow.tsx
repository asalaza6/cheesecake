import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
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
    const [margin, setMargin] = useState(0);
    // pos ranges from 0 to images.length - 1

    useEffect(() => {
        x.set(-width);
    }, [width]);

    useEffect(()=> {
        console.log(margin);
    }, [margin]);

    const updateMargin = useCallback((value: number) => {
        setMargin((old)=> {
            if (value + old > 0) {
                const newMargin = old-document.getElementById('carousel').offsetWidth;
                return newMargin;
            } else if (value + old < -document.getElementById('carousel').offsetWidth) {
                const newMargin = old+document.getElementById('carousel').offsetWidth;
                return newMargin;
            }
            return old;
        });
        // if (value - margin > 0) {
        // }
        // console.log(value, margin, value-margin, document.getElementById('carousel').offsetWidth);
    }, [margin]);

    useEffect(() => {
        if (paused || drag === 'dragging') return;
        console.log('timeout start');
        if (!width) {
            setWidth(document.getElementById('carousel').offsetWidth);
        }
        x.onChange(updateMargin);
        const timer = setInterval(() => {
            x.stop();
            x.set(x.getPrevious()+2);
            // console.log('timeout called', slideshowPos);
        }, 10);
        return () => {
            console.log('timeout ended');
            clearInterval(timer);
        }
    }, [paused, drag, width, margin]);
    
    const slideshowImages = useMemo(() => {
        // pos determines the first element only
        const format = pos ? images.slice(pos, images.length).concat(images.slice(0, pos)) : images;
        console.log(format);
        return [...format, ...format];
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
            border: '24px black solid', 
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

    const insideDivStyle: CSSProperties = {
        width: `${100*images.length/slideshowAmount}%`,
        transform: `translate(${margin}px, 0px)`,
    }

    return (
        <Flex marginTop= '20vh' maxWidth='40%' direction="column" dir="center" justify="center">
            <motion.div {...motionDivProps}>
                <Flex direction="row" style={insideDivStyle}>
                    <AnimatePresence>
                    {
                        slideshowImages.map((item => 
                            <SlideshowImage {...item} onImageHover={onImageHover} />
                        ))
                    }
                    </AnimatePresence>
                </Flex>
            </motion.div>
            {/* <Flex>
                <Flex>X: {x.get()}</Flex>
                <Flex>Width: {width}</Flex>
                <Flex>Margin: {margin}</Flex>
            </Flex> */}
            <Flex dir='row'>
                {description}
            </Flex>
            {/* <Button onClick={nextSlide}>next</Button> */}
        </Flex>
    );
}

export default Slideshow;