import React from 'react'
import styles from './MasonryGrid.module.css'
import Masonry from 'react-masonry-css'

const MasonryGrid = ({
    breakpoints = 3,
    gutter = 16,
    padding = '',
    children,
}) => {
    const style = {
        '--gap': `${gutter}px`,
        '--padding': padding,
    }

    return (
        <>
            <Masonry
                breakpointCols={breakpoints}
                className={styles.my_masonry_grid}
                columnClassName={styles.my_masonry_grid_column}
                style={style}
            >
                {children}
            </Masonry>
        </>
    )
}

export default MasonryGrid
