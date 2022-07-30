import { HTMLAttributes, useMemo } from "react";
import classNames from "classnames";
// import './svgIcon.module.css'
import styled from "styled-components";

/**
 * 判断是否是外部资源（网络资源）
 * @param icon 
 * @returns boolean
 */
 export const eternal = (url: string) => {
  return /^https?:\/\/.+$/.test(url)
}

interface SvgIconProps extends HTMLAttributes<HTMLElement> {
  icon: string;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ icon, className, ...config }) => {
  // 判断是否是外部资源
  const isEternal = eternal(icon)

  // 外部资源样式
   const styleEternalIcon = useMemo(() => {
    return Object.assign({
      mask: `url(${icon}) no-repeat`,
      'WebkitMask': `url(${icon}) no-repeat`,
    }, config.style || {})
  }, [icon, config])

  // 外部资源className
  const classNameEternalIcon = useMemo(() => {
    return classNames(className, {
      'svg-eternal-icon': true,
      'svg-icon': true
    })
  }, [className])

  // 项目内图标名称
  const iconName = useMemo(() => `#icon-${icon}`, [icon])

  // 内部资源className
  const classNameIcon = useMemo(() => {
    return classNames(className, {
      'svg-icon': true
    })
  }, [className])
  return (
    <>
      {
        isEternal ? (
          <div
            {...config}
            style={styleEternalIcon}
            className={classNameEternalIcon}
          ></div>
        ) : 
        (
          <span {...config}>
            <svg
              className={classNameIcon}
              aria-hidden="true"
            >
              <use xlinkHref={iconName} />
            </svg>
          </span>
        )
      }
    </>
  );
}

// 关于上面组件的说明：

// svg标签外，为什么要加一层span标签？ 答：因为svg不能直接绑定事件，需要将时间绑定的HTML标签上

// isEternal是什么？ 答： 是封装的判断资源是不是网络资源；实现方法如下：

export default SvgIcon