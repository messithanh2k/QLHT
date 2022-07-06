import React, { useState } from 'react';
import './CSS/ImageSlider.css';
import Carousel from 'react-bootstrap/Carousel';
import coverImage from '../assets/images/anh_cover.png';

function ImageSlider() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item interval={6000}>
                    <img
                        className="d-block w-100 imageSlider"
                        src="https://soict.hust.edu.vn/wp-content/uploads/SoICT-Talk-5.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption className="sliderCaption">
                        <h3>SoICT’s Talk – Episode 5: Vào Bách khoa để làm việc KHÓ!!!</h3>
                        <p>
                            Vào BK để làm VIỆC KHÓ, vào BK để thành người giỏi nhất trong số những người giỏi, và vào BK
                            để đóng góp trí tuệ và tài năng cho đất nước.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                    <img
                        className="d-block w-100 imageSlider"
                        src="https://soict.hust.edu.vn/wp-content/uploads/Slide-show-website-2.png"
                        alt="Second slide"
                    />

                    <Carousel.Caption className="sliderCaption">
                        <h3>Tiếp tục khẳng định vị thế</h3>
                        <p>
                            Nhóm ngành Khoa học máy tính và Hệ thống thông tin tiếp tục đứng vị trí thứ nhất tại Việt
                            Nam, xếp hạng 401-450 thế giới, tăng 150 bậc so với 2021{' '}
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100 imageSlider"
                        src="https://soict.hust.edu.vn/wp-content/uploads/2019/05/t-1.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption className="sliderCaption">
                        <h3>Hệ thống quản trị đại học trực tuyến</h3>
                        <p>
                            Hệ thống do Trường Công nghệ Thông tin và Truyền thông - Đại học Bách khoa Hà Nội thiết kế
                            và phát triển
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 imageSlider"
                        src="https://soict.hust.edu.vn/wp-content/uploads/%E1%BA%A2nh-chung.jpg"
                        alt="Fourth slide"
                    />

                    <Carousel.Caption className="sliderCaption">
                        <h3>15 năm Nhân tài Đất Việt </h3>
                        <p>
                            Dấu ấn đậm nét của Công nghệ Thông tin – ĐHBK Hà Nội trong hành trình 15 năm của giải thưởng
                            CNTT uy tín nhất Việt Nam.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <img className="coverImage" src={coverImage} alt="hướng dẫn sử dụng" />
        </div>
    );
}

export default ImageSlider;
