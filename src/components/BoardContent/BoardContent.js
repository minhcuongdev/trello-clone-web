import React, { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { isEmpty } from 'lodash'

import './BoardContent.scss'

import Column from 'components/Column/Column'
import { initialData } from 'actions/initialData'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'

function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumn] = useState([])

    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
        if (boardFromDB) {
            setBoard(boardFromDB)

            setColumn(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        }
    }, [])

    if (isEmpty(board)) {
        return <div className="not-found" style={{ 'padding': '10px', 'color': 'white' }}>Board Not Found</div>
    }

    const onColumnDrop = (dropResult) => {
        let newBoard = { ...board }
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)

        newBoard.columnOrder = newColumns.map(col => col.id)
        newBoard.columns = newColumns

        setColumn(newColumns)
        setBoard(newBoard)
    }

    const onCardDrop = (columnID, dropResult) => {
        if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {

            let newColumns = [...columns]
            let currentColumn = newColumns.find(col => col.id === columnID)

            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(cart => cart.id)

            setColumn(newColumns)
        }
    }

    return (
        <div className="board-content">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index}>
                        <Column column={column} onCardDrop={onCardDrop} />
                    </Draggable>
                ))}
            </Container>
            <div className="add-new-column">
                <i className="icon fa fa-plus" />
                <div>Add another card</div>
            </div>
        </div>
    )
}

export default BoardContent