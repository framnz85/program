import React, { useEffect } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const LessonNav = ({ program, setValues }) => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const lessonList = program.lessons;

  useEffect(() => {
    if (queryParams.get("video")) {
      goToStepTask();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const items =
    lessonList &&
    lessonList.map((les) =>
      getItem(
        les.lesson,
        les._id,
        <AppstoreOutlined />,
        les.videos.map((vid) => getItem(vid.title, vid._id))
      )
    );

  const handleNavigate = (value) => {
    const getLesson = lessonList.filter((les) => les._id === value.keyPath[1]);
    const getTheVideo = getLesson[0].videos.filter(
      (vid) => vid._id === value.keyPath[0]
    );
    const {
      title,
      vimeoId,
      type = "",
      buttonTitle = "",
      description = "",
      buttonLink = "",
    } = getTheVideo[0];
    setValues({ title, vimeoId, type, buttonTitle, description, buttonLink });
    navigate(
      `/access/${program.slug}/?video=${value.keyPath[0]}${
        queryParams.get("nomodal") || sessionStorage.getItem("nomodal")
          ? "&nomodal=1"
          : ""
      }`
    );
  };

  const goToStepTask = () => {
    lessonList &&
      lessonList.map((les) => {
        return (
          les.videos &&
          les.videos.map((vid) => {
            return vid._id === queryParams.get("video")
              ? setValues({
                  title: vid.title,
                  vimeoId: vid.vimeoId,
                  type: vid.type ? vid.type : "",
                  buttonTitle: vid.buttonTitle ? vid.buttonTitle : "",
                  description: vid.description ? vid.description : "",
                  buttonLink: vid.buttonLink ? vid.buttonLink : "",
                })
              : "";
          })
        );
      });
  };

  return (
    <div style={{ width: "100%" }}>
      {lessonList && lessonList[0] && (
        <Menu
          defaultSelectedKeys={[
            queryParams.get("video")
              ? queryParams.get("video")
              : lessonList[0].videos[0]._id,
          ]}
          defaultOpenKeys={lessonList.map((lesson) => lesson._id)}
          mode="inline"
          theme="dark"
          inlineCollapsed={false}
          items={items}
          onClick={(value) => handleNavigate(value)}
        />
      )}
    </div>
  );
};

export default LessonNav;
