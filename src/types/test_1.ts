export interface CardImgProps {
    direction?: 'top' | 'bottom' | 'left' | 'right' | 'topBot'
    text?: string
    geometry?: 'triangle' | 'ovalShape' | 'circle' | 'squareShape' | 'rectangleShape' | 'trapezoidShape' | 'parallelogramShape'
    callback?(): void
    classCss?: string
}