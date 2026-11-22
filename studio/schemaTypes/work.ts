import { defineField, defineType } from "sanity";

export const work = defineType({
  name: "work",
  title: "作品项目",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "作品名称",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "legacyId",
      title: "作品编号（系统识别）",
      type: "string",
      description: "用于保留现有作品与网站内容的对应关系，新增作品可留空。",
    }),
    defineField({
      name: "category",
      title: "所属分类",
      type: "string",
      options: {
        list: [
          { title: "内容运营与策划", value: "运营" },
          { title: "视频与 AI 创作", value: "视频" },
          { title: "视觉设计作品", value: "视觉" },
          { title: "其他作品", value: "其他" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "作品类型 / 项目标签",
      type: "string",
      description: "例如：短视频 / 新媒体运营、AIGC / 影像创作。",
    }),
    defineField({
      name: "description",
      title: "作品简介",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "个人职责",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "result",
      title: "项目成果 / 数据",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "关键词标签",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "detail",
      title: "详情介绍（分段填写）",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "coverImage",
      title: "作品封面",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "作品图片 / 长图（可多张、不同尺寸）",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "videoUrl",
      title: "视频链接",
      type: "url",
      description: "可填写公开视频链接。",
    }),
    defineField({
      name: "externalUrl",
      title: "外部作品链接",
      type: "url",
    }),
    defineField({
      name: "tone",
      title: "卡片底色风格",
      type: "string",
      initialValue: "peach",
      options: {
        list: [
          { title: "暖桃色", value: "peach" },
          { title: "淡紫色", value: "lavender" },
          { title: "鼠尾草绿", value: "sage" },
          { title: "沙色", value: "sand" },
          { title: "浅玫瑰色", value: "rose" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "sortOrder",
      title: "排序数字（越小越靠前）",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "isVisible",
      title: "在网站中显示",
      type: "boolean",
      initialValue: true,
      description: "关闭后作品仍保留在后台，但不会显示在公开网站。",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
  orderings: [
    {
      title: "网站展示顺序",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "最近修改",
      name: "updatedDesc",
      by: [{ field: "_updatedAt", direction: "desc" }],
    },
  ],
});