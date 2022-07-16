import React, { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
        desc: 'Strawberry',
    },
    {
        imageSrc: '/static/general2.jpg',
        alt: 'Cheesecake Connect',
        desc: 'Oreo',
    },
    {
        imageSrc: '/static/general3.jpg',
        alt: 'Cheesecake Connect',
        desc: 'Peanut Butter & Oreo Triple',
    },
    {
        imageSrc: '/static/general4.jpg',
        alt: 'Cheesecake Connect',
        desc: 'Chocolate Strawberry Peanut Butter Triple',
    },
    {
        imageSrc: '/static/general5.jpeg',
        alt: 'Cheesecake Connect',
        desc: 'Lemon',
    },
    {
        imageSrc: '/static/general6.jpeg',
        alt: 'Cheesecake Connect',
        desc: 'Strawberry Single',
    },
];
type SlideshowImageProps = ImageInfo & {
    onImageHover: (desc: string | null, clickBoolean?: boolean) => void;
}

const slideshowAmount = 4;
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
        onClick: () => {
            onImageHover(props.desc, true);
            setIsHover(true);
            // hover for 3 seconds
            setTimeout(() => {
                onImageHover(null, true);
                setIsHover(false);
            }, 1500);
        },
        style: {
            width: `${Math.floor(100/slideshowAmount)}%`
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
export const Slideshow: React.FC<any> = (props: any) => {
    const [description, setDescription] = useState<string | null>(null);
    const [pos, setPos] = useState<number>(0);
    const [width, setWidth] = useState(0);
    const x = useMotionValue(-width);
    const velocity = useVelocity(x);
    const [drag, setDrag] = useState<'x' | false | 'dragging' | 'endDrag' | 'paused'>('x'); // 3 states (initial) (during drag) (no drag for reset)
    const [margin, setMargin] = useState(0);
    const timeoutID = useRef<NodeJS.Timeout | undefined>();
    // pos ranges from 0 to images.length - 1

    // useEffect(() => {
    //     x.set(-width);
    // }, [width, x]);

    useEffect(()=> {
        console.log(margin);
    }, [margin]);

    const updateMargin = useCallback((value: number) => {
        setMargin((old)=> {
            if (value + old > 0) {
                const newMargin = old - (document.getElementById('carousel').offsetWidth) * (images.length/slideshowAmount);
                return newMargin;
            } else if (value + old < - (document.getElementById('carousel').offsetWidth) * (images.length/slideshowAmount)) {
                const newMargin = old + (document.getElementById('carousel').offsetWidth) * (images.length/slideshowAmount);
                return newMargin;
            }
            return old;
        });
        // if (value - margin > 0) {
        // }
        // console.log(value, margin, value-margin, document.getElementById('carousel').offsetWidth);
    }, []);

    useEffect(() => {
        if (drag === 'dragging' || drag === 'endDrag' || drag === 'paused') return;
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
    }, [drag, width, margin, updateMargin, x]);
    
    const slideshowImages = useMemo(() => {
        // pos determines the first element only
        const format = pos ? images.slice(pos, images.length).concat(images.slice(0, pos)) : images;
        console.log(format);
        return [...format, ...format];
    }, [pos]);

    const onImageHover = (desc: string | null, click = false) => {
        setDescription(desc);
        // if (desc) {
        //     setDrag((prevDrag) => {
        //         if (prevDrag === 'x') {
        //             return 'paused';
        //         }
        //         return prevDrag;
        //     });
        // } else {
        //     setDrag((prevDrag) => {
        //         if (prevDrag === 'paused') {
        //             return false;
        //         }
        //         return prevDrag;
        //     });
        // }
        if (click) {
            if (desc) {
                setDrag((prevDrag) => {
                    if (prevDrag === 'x') {
                        return 'paused';
                    }
                    return prevDrag;
                });
            } else {
                setDrag((prevDrag) => {
                    if (prevDrag === 'paused') {
                        console.log('setting false from onImageHover')
                        return false;
                    }
                    return prevDrag;
                });
            }
        }
    }

    useEffect(() => {
        console.log(`drag = ${drag}`)
        if (drag === false) {
            setTimeout(() => {
                setDrag('x');
            }, 10);
        }
    }, [drag]);

    const onDragEnd = () => {
        setDrag('endDrag');
        if (timeoutID.current) {
            clearTimeout(timeoutID.current);
            timeoutID.current = undefined;
        }
        timeoutID.current = setTimeout(() => {
            setDrag((prevDrag) => {
                if (prevDrag === 'endDrag') {
                    console.log('settings false from dragEnd');
                    return false;
                }
                return prevDrag;
            });
        }, 3000);
    }

    const motionDivProps = {
        id: 'carousel',
        style: {
            x,
            margin: '50px 0px 50px 0px' 
        },
        drag: (drag === 'dragging' || drag === 'endDrag' || drag === 'paused') ? 'x' : drag,
        onDragStart: () => { setDrag('dragging'); },
        onDragEnd,
        onDrag: () => {
            // const width = document.getElementById('carousel').offsetWidth;
            updateMargin(x.get());
            // if (x.get() > width) {
            //     x.set(x.get()-width);
            // }
        },
    };

    const insideDivStyle: CSSProperties = {
        width: `${2*100*images.length/slideshowAmount}%`,
        transform: `translate(${margin}px, 0px)`,
    }

    return (
        <Flex maxWidth='100%' direction="column" dir="center" justify="center">
            <motion.div {...motionDivProps}>
                <Flex direction="row" style={insideDivStyle}>
                    <AnimatePresence>
                    {
                        slideshowImages.map(((item, index) => 
                            <SlideshowImage key={`item.imageSrc${index}`} {...item} onImageHover={onImageHover} />
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
            <Flex dir='row' justify='center' minH='50px' style={{ fontSize: '25pt', fontWeight: 'bold' }}>
                {description}
            </Flex>
            {/* <Button onClick={nextSlide}>next</Button> */}
        </Flex>
    );
}

export default Slideshow;